<?php

namespace Drupal\dashboard\Controller;
use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\JsonResponse;

class DashboardController extends ControllerBase {
  public function index() {
    return [
      '#theme' => 'dashboard',
    ];
  }

  public function data() {
    $nids   = \Drupal::entityQuery('node')->execute();
    $nodes  =  \Drupal\node\Entity\Node::loadMultiple($nids);
    $unpublished  = [];
    $published    = [];
    foreach ($nodes as $node) {
      if ($node->isPublished()) {
        array_push($published, $node);
      } else {
        array_push($unpublished, $node);
      }
    }
    $data = array('nodes' => [
      'published'   => count($published),
      'unpublished' => count($unpublished),
    ]);
    return new JsonResponse($data);
  }
}
